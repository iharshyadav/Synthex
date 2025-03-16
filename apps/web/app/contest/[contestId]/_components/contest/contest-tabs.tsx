import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/components/ui/tabs"
import ProblemsTab from "./tabs/problems-tab"
import DetailsTab from "./tabs/details-tab"
import ParticipantsTab from "./tabs/participants-tab"
import UpdatesTab from "./tabs/updates-tab"
import { IContest } from "types/contestType"
import ProblemsManagementTab from "./tabs/ProblemsManagement-Tab"

interface ContestTabsProps {
  contest: any
}

export default function ContestTabs({ contest }: ContestTabsProps) {
  // const { _id : contestId, problems, onAddProblem, onUpdateProblem, onDeleteProblem, onReorderProblems } = contest;
  // console.log(contest.participants)
  return (
    <Tabs defaultValue="details" className="space-y-4">
      <TabsList className="grid grid-cols-3 w-full">
        {/* <TabsTrigger value="problems">Problems</TabsTrigger> */}
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="participants">Participants</TabsTrigger>
        <TabsTrigger value="problems">Problems</TabsTrigger>
        {/* <TabsTrigger value="updates">Updates</TabsTrigger> */}
      </TabsList>

      {/* <TabsContent value="problems">
        <ProblemsTab problems={contest.problems} />
      </TabsContent> */}

      <TabsContent value="details">
        <DetailsTab />
      </TabsContent>

      <TabsContent value="participants">
        <ParticipantsTab
          participants={contest?.participants}
          // waitlist={contest.waitlist}
          // participantLimit={contest.participantLimit}
          // currentParticipants={contest.currentParticipants}
        />
      </TabsContent>

      <TabsContent value="problems">
        <ProblemsManagementTab
          problems={contest?.problems}
        />
      </TabsContent>

      {/* <TabsContent value="updates">
        <UpdatesTab updates={contest?.updates} />
      </TabsContent> */}
    </Tabs>
  )
}

