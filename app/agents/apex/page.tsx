import ModulePlaceholder from '@/components/uacs/ModulePlaceholder'

export default function ApexAgentPage() {
  return <ModulePlaceholder title="APEX" eyebrow="MISSION CONTROLLER" description="Inspect orchestration assignments, guarded actions, handoffs, and agent execution receipts." capabilities={["Mission dispatch", "Agent handoff tracking", "Approval-aware escalation"]} />
}
