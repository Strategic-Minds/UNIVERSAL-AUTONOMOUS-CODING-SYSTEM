import ModulePlaceholder from '@/components/uacs/ModulePlaceholder'

export default function TemplatesPage() {
  return <ModulePlaceholder title="Templates" eyebrow="REUSABLE SOURCE TRUTH" description="Manage approved project, workflow, agent, validation, rollback, and release templates." capabilities={["Canonical template registry", "Version and checksum tracking", "Approved reuse contracts"]} />
}
