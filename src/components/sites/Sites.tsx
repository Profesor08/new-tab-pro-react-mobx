import React, { useRef, useEffect } from "react";
import { observer } from "mobx-react";
import options from "./../../store-mobx/options";
import sites, { ISite } from "../../store-mobx/sites";
import editSite from "../../store-mobx/edit-site";
import AddSiteButton from "./AddSiteButton";
import EditSite from "./EditSite";
import "./sites.scss";

interface ISitesList {
  style: string;
  sites: React.ReactNode[];
}

const SiteItem = observer(({ site, id }: { site: ISite; id: number }) => {
  let className = "site-button";

  if (options.additionalOptions) {
    className += " options-active";
  }

  return (
    <div className={className}>
      <div className="name">{site.name}</div>
      <a className="link" href={site.url}>
        <div className={`image site-image-${id}`} />
      </a>
      <div
        className="edit-site"
        onClick={e => {
          e.preventDefault();
          editSite.id = id;
          editSite.active = true;
        }}
      >
        ✎
      </div>
      <div className="remove-site" onClick={e => sites.remove(id)}>
        ×
      </div>
    </div>
  );
});

const getSitesList = () => {
  return sites.sites.reduce(
    (acc: ISitesList, site: ISite, id: number) => {
      acc.style += `
      .site-button .image.site-image-${id} {
        background-image: url(${site.image});
      }
      `;

      acc.sites.push(<SiteItem key={`site-item-${id}`} site={site} id={id} />);

      return acc;
    },
    {
      style: "",
      sites: [],
    },
  );
};

function constrain(n: number, low: number, high: number): number {
  return Math.max(Math.min(n, high), low);
}

function map(
  value: number,
  start1: number,
  stop1: number,
  start2: number,
  stop2: number,
  withinBounds?: boolean,
): number {
  let newValue =
    ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  if (!withinBounds) {
    return newValue;
  }
  if (start2 < stop2) {
    return constrain(newValue, start2, stop2);
  } else {
    return constrain(newValue, stop2, start2);
  }
}

let initialized = false;

const initSitesPanelAnimation = (
  ref: React.MutableRefObject<null | HTMLElement>,
) => {
  useEffect(() => {
    const container = ref.current;

    if (container && initialized === false) {
      initialized = false;

      let activated = false;

      const pos = {
        mx: container.offsetWidth / 2,
        my: container.offsetHeight / 2,
        x: container.offsetWidth / 2,
        y: container.offsetHeight / 2,
        rx: container.offsetWidth / 2,
        ry: container.offsetHeight / 2,
      };

      let lastTime = Date.now();
      const speed = 3.0;

      container.addEventListener("mouseenter", e => {
        pos.mx = container.offsetWidth / 2;
        pos.my = container.offsetHeight / 2;
        pos.x = pos.mx;
        pos.y = pos.my;

        if (activated === false) {
          activated = true;
          animate();
        }
      });

      container.addEventListener("mousemove", e => {
        const rect = container.getBoundingClientRect();
        pos.mx = e.clientX - rect.left;
        pos.my = e.clientY - rect.top;
      });

      container.addEventListener("mouseleave", e => {
        pos.mx = container.offsetWidth / 2;
        pos.my = container.offsetHeight / 2;
      });

      const animate = () => {
        requestAnimationFrame(animate);

        const now = Date.now();
        const dt = now - lastTime;
        lastTime = now;

        let ease_t = (dt / 1000) * speed;

        if (ease_t > 1) {
          ease_t = 1;
        }

        pos.x += (pos.mx - pos.x) * ease_t;
        pos.y += (pos.my - pos.y) * ease_t;

        let halfW = container.offsetWidth / 2;
        let halfH = container.offsetHeight / 2;

        let rotateY = parseFloat(
          map(Math.abs(pos.x - halfW), 0, halfW, 0, 5).toFixed(5),
        );

        let rotateX = parseFloat(
          map(Math.abs(pos.y - halfH), 0, halfH, 0, 5).toFixed(5),
        );

        if (pos.x - halfW < 0) {
          rotateY *= -1;
        }

        if (pos.y - halfH > 0) {
          rotateX *= -1;
        }

        container.style.transform = `perspective(900px) rotateX(${-rotateX}deg) rotateY(${-rotateY}deg) translate3d(0, 0, 0)`;
      };
    }
  });
};

export const Sites = observer(() => {
  const ref: React.MutableRefObject<any> = useRef(null);

  initSitesPanelAnimation(ref);

  if (options.showWebSites) {
    const { style, sites: sitesList } = getSitesList();

    return (
      <div className="sites-container" ref={ref}>
        <style>{style}</style>
        <EditSite />
        <div className="sites-grid">
          {sitesList}
          <AddSiteButton />
        </div>
      </div>
    );
  }
  return null;
});

export default Sites;
