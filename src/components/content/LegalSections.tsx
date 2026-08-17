interface LegalSection {
  heading: string;
  body: readonly string[];
}

export function LegalSections({ sections }: { sections: readonly LegalSection[] }) {
  return (
    <div className="prose-measure space-y-10">
      {sections.map((section) => (
        <div key={section.heading}>
          <h2 className="text-[1.4rem]">{section.heading}</h2>
          <div className="mt-3 space-y-3 text-[var(--color-ink-60)]">
            {section.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
