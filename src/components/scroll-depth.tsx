/**
 * Global scroll-linked depth layer. It adds spatial context without changing
 * page layout or blocking interaction.
 */
export function ScrollDepth() {
  return (
    <div aria-hidden="true" className="depth-atmosphere">
      <div className="depth-grid depth-grid-far" />
      <div className="depth-grid depth-grid-near" />
      <div className="depth-edge depth-edge-left" />
      <div className="depth-edge depth-edge-right" />
    </div>
  );
}
