// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.11;

/*
    Contract CampaignFactory to create new campaigns and
    store addresses of the created campaigns
*/
contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(string calldata campaignName) public {
        Campaign newCampaign = new Campaign(campaignName, msg.sender);
        deployedCampaigns.push(address(newCampaign));
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}

/*
    Contract Campaign to provide the actual functionality
    to manage the complete election campaign from start to end
*/
contract Campaign {
    // voter model
    struct Voter {
        uint256 uid; // unique id
        string fullName;
        string location;
        bool voted;
        uint256 cid;
    }

    // candidate model
    struct Candidate {
        uint256 uid; // unique id
        string fullName;
        string location;
        uint256 votes;
    }

    address public manager; // election manager private key address
    string public name; // campaign name

    Voter[] public voters; // array of voters
    uint256[] public vids; // array of voter ids for lookup

    Candidate[] public candidates; // array of candidates
    uint256[] public cids; // array of candidate ids for lookup

    uint256 public totalVotes; // total votes polled
    bool public complete; // campaign status

    uint256 public winner; // winner uid

    mapping(uint256 => uint256) public voterIndex;
    mapping(uint256 => uint256) public candidateIndex;

    // create campaign function
    constructor(string memory campaignName, address sender) {
        manager = sender;
        name = campaignName;
    }

    // register a new voter function
    function registerVoter(
        uint256 uid,
        string calldata fullName,
        string calldata location
    ) public {
        Voter memory newVoter = Voter({
            uid: uid,
            fullName: fullName,
            location: location,
            voted: false,
            cid: 0
        });

        voters.push(newVoter);
        vids.push(uid);
        voterIndex[uid] = vids.length - 1;
    }

    // register a new candidate function
    function registerCandidate(
        uint256 uid,
        string calldata fullName,
        string calldata location
    ) public {
        Candidate memory newCandidate = Candidate({
            uid: uid,
            fullName: fullName,
            location: location,
            votes: 0
        });

        candidates.push(newCandidate);
        cids.push(uid);
        candidateIndex[uid] = cids.length - 1;
    }

    // poll vote function
    function pollVote(uint256 vid, uint256 cid) public {
        Voter storage voter = voters[voterIndex[vid]];
        //check if user already voted
        require(!voter.voted);
        // else poll vote
        voter.voted = true;
        voter.cid = cid;

        // increase candidate vote count
        Candidate storage candidate = candidates[candidateIndex[cid]];
        candidate.votes++;

        // increase total vote count
        totalVotes++;
    }

    // declare the campaign result
    function declareResult() public restricted {
        require(msg.sender == manager);
        require(!complete);
        // close the poll
        complete = true;

        uint256 max = 0;
        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].votes > max) {
                max = candidates[i].votes;
                winner = candidates[i].uid;
            }
        }
    }

    // get result summary
    function getResult()
        public
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        return (totalVotes, candidates[candidateIndex[winner]].votes, winner);
    }

    // get campaign summary
    function getSummary()
        public
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        return (voters.length, candidates.length, totalVotes);
    }

    // get total registered voters count
    function getVotersCount() public view returns (uint256) {
        return voters.length;
    }

    // get total registered candidate count
    function getCandidatesCount() public view returns (uint256) {
        return candidates.length;
    }

    // get unique ids of all registered voters
    function getVoterIds() public view returns (uint256[] memory) {
        return vids;
    }

    // get unique ids of all registered candidates
    function getCandidateIds() public view returns (uint256[] memory) {
        return cids;
    }

    // modifier to restrict method calling only by the campaign manager
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
}
