export default function DemoFooter({ projectName }: { projectName?: string }) {
  return (
    <div className="demo-footer">
      <div className="demo-footer-left">• DEMO DATA &nbsp;•&nbsp; DESIGN REFERENCE {projectName ? `• ${projectName}` : ''}</div>
      <div className="demo-footer-brand">
        <div className="demo-footer-mark">U</div>
        <span className="demo-footer-text">UACS — STRATEGIC MINDS ///</span>
      </div>
    </div>
  )
}
