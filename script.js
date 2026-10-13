
"use strict";

document.addEventListener("DOMContentLoaded", () => {

  // MOBILE NAVIGATION

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle?.addEventListener("click", () => {
    if (!navLinks) return;

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );
  });

  navLinks?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });


  // HOMEPAGE INTERACTIVE ENVELOPE

  const heroEnvelope = document.getElementById("heroEnvelope");
  const heroEnvelopeButton = document.getElementById("heroEnvelopeButton");

  heroEnvelopeButton?.addEventListener("click", () => {
    if (!heroEnvelope) return;

    const isOpen = heroEnvelope.classList.toggle("open");

    heroEnvelopeButton.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    heroEnvelopeButton.textContent = isOpen
      ? "Close Love Letter ↺"
      : "Open Your Love Letter ♡";
  });


  // INTERACTIVE LENS SELECTOR

  const lenses = {
    honey: {
      name: "Toast Honey Brown",
      image: "lens/brown.png",
      description:
        "Warm, soft, and naturally captivating. A little golden glow for those unforgettable glances."
    },

    sesame: {
      name: "Toast Sesame Grey",
      image: "lens/grey.png",
      description:
        "Subtle, dreamy, and effortlessly expressive. A soft grey shade for a look that feels entirely your own."
    }
  };

  const lensImage = document.getElementById("featuredLensImage");
  const lensName = document.getElementById("featuredLensName");
  const lensDescription = document.getElementById("featuredLensDescription");

  document.querySelectorAll("[data-lens]").forEach(button => {
    button.addEventListener("click", () => {
      const lens = lenses[button.dataset.lens];

      if (!lens || !lensImage) return;

      lensImage.src = lens.image;
      lensImage.alt = lens.name + " contact lens";

      if (lensName) {
        lensName.textContent = lens.name;
      }

      if (lensDescription) {
        lensDescription.textContent = lens.description;
      }

      lensImage.classList.remove("lens-swap");
      void lensImage.offsetWidth;
      lensImage.classList.add("lens-swap");

      document.querySelectorAll("[data-lens]").forEach(option => {
        const selected = option === button;

        option.classList.toggle("selected", selected);
        option.setAttribute("aria-pressed", String(selected));
      });
    });
  });


  // INTERACTIVE INSTAGRAM STORY VIEWER

  const frames = [
    "IG flow/ig-flow-1.png",
    "IG flow/ig-flow-2.gif",
    "IG flow/ig-flow-3.gif",
    "IG flow/ig-flow-4.gif",
    "IG flow/ig-flow-5.png"
  ];

  const storyImage = document.getElementById("igImage");
  const progress = document.getElementById("igProgress");
  const counter = document.getElementById("igCounter");
  const status = document.getElementById("storyStatus");

  let index = 0;

  if (storyImage && progress) {
    frames.forEach(() => {
      const bar = document.createElement("div");
      bar.className = "story-segment";

      const fill = document.createElement("div");
      fill.className = "story-fill";

      bar.append(fill);
      progress.append(bar);
    });

    const fills = [...progress.querySelectorAll(".story-fill")];

    function showStory(nextIndex) {
      index = (nextIndex + frames.length) % frames.length;

      storyImage.src = frames[index];
      storyImage.alt =
        `Instagram story frame ${index + 1} of ${frames.length}`;

      if (counter) {
        counter.textContent = `${index + 1} / ${frames.length}`;
      }

      if (status) {
        status.textContent =
          `${String(index + 1).padStart(2, "0")} / ${String(frames.length).padStart(2, "0")}`;
      }

      fills.forEach((fill, position) => {
        fill.style.width = position <= index ? "100%" : "0%";
      });
    }

    document.getElementById("igNext")
      ?.addEventListener("click", () => showStory(index + 1));

    document.getElementById("igPrev")
      ?.addEventListener("click", () => showStory(index - 1));

    document.getElementById("storyForward")
      ?.addEventListener("click", () => showStory(index + 1));

    document.getElementById("storyBack")
      ?.addEventListener("click", () => showStory(index - 1));

    document.getElementById("igViewer")
      ?.addEventListener("keydown", event => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          showStory(index + 1);
        }

        if (event.key === "ArrowLeft") {
          event.preventDefault();
          showStory(index - 1);
        }
      });

    showStory(0);
  }


  // SCROLL REVEAL ANIMATIONS

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if ("IntersectionObserver" in window && !reducedMotion) {
    document.documentElement.classList.add("js-reveal");

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.03,
      rootMargin: "0px 0px 40px 0px"
    });

    document.querySelectorAll(".reveal").forEach(element => {
      observer.observe(element);
    });
  }

});
