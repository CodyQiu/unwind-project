const features = [
  {
    title: "Reflect",
    icon: "✍️",
    copy: "Capture the thoughts you want to set down before sleep.",
  },
  {
    title: "Breathe",
    icon: "🫧",
    copy: "Follow a simple 4-4-4 cadence to soften the day’s edges.",
  },
  {
    title: "Prepare",
    icon: "✨",
    copy: "Check off small rituals that help your room and mind feel ready.",
  },
];

function Home() {
  return (
    <section className="home-grid">
      <div className="home-hero card">
        <p className="eyebrow">Tonight’s intention</p>
        <h2>Ease into a softer evening.</h2>
        <p>
          Choose a tool above to journal, breathe, or prepare your space. Each
          step is designed to feel warm, simple, and restorative.
        </p>
      </div>
      <div className="feature-grid">
        {features.map((feature) => (
          <article className="feature-card" key={feature.title}>
            <span className="feature-icon" aria-hidden="true">
              {feature.icon}
            </span>
            <h3>{feature.title}</h3>
            <p>{feature.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Home;
