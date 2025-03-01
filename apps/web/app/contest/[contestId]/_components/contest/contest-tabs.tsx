import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/components/ui/tabs"
import ProblemsTab from "./tabs/problems-tab"
import DetailsTab from "./tabs/details-tab"
import ParticipantsTab from "./tabs/participants-tab"
import MaterialsTab from "./tabs/materials-tab"
import UpdatesTab from "./tabs/updates-tab"
import { IContest } from "types/contestType"

interface ContestTabsProps {
  contest: any
}

export default function ContestTabs({ contest }: ContestTabsProps) {
  return (
    <Tabs defaultValue="problems" className="space-y-4">
      <TabsList className="grid grid-cols-5 w-full">
        <TabsTrigger value="problems">Problems</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="participants">Participants</TabsTrigger>
        <TabsTrigger value="materials">Materials</TabsTrigger>
        <TabsTrigger value="updates">Updates</TabsTrigger>
      </TabsList>

      <TabsContent value="problems">
        <ProblemsTab problems={contest.problems} />
      </TabsContent>

      <TabsContent value="details">
        <DetailsTab rules={contest.rules} />
      </TabsContent>

      <TabsContent value="participants">
        <ParticipantsTab
          participants={contest.participants}
          waitlist={contest.waitlist}
          participantLimit={contest.participantLimit}
          currentParticipants={contest.currentParticipants}
        />
      </TabsContent>

      <TabsContent value="materials">
        <MaterialsTab materials={contest.materials} />
      </TabsContent>

      <TabsContent value="updates">
        <UpdatesTab updates={contest.updates} />
      </TabsContent>
    </Tabs>
  )
}

