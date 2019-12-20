import React from "react";
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

export const Sites = observer(() => {
  if (options.showWebSites) {
    const { style, sites: sitesList } = getSitesList();

    return (
      <div className="sites-container">
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

/*
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import "./sites.scss";
import {
  removeSite,
  updateSite,
  Site,
  SitesAppInitialState,
} from "../../store/reducers/sitesApp";
import { OptionsAppInitialState } from "../../store/reducers/optionsApp";
import AddSiteButton from "./AddSiteButton";
import EditSite from "./EditSite";
import sites, { ISite } from "../../store-mobx/sites";

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

interface SitesDispatchProps {
  removeSite: (index: number) => void;
  updateSite: (index: number, site: Site) => void;
}

interface SitesStateProps {
  sites: Site[];
  additionalOptions: boolean;
  showWebSites: boolean;
}

interface SitesAppState {
  sitesApp: SitesAppInitialState;
  optionsApp: OptionsAppInitialState;
}

type Props = SitesStateProps & SitesDispatchProps;

interface State {
  selectedSite: Site | null;
  selectedSiteIndex: number | null;
}

class Sites extends Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props, state);

    this.state = {
      selectedSite: null,
      selectedSiteIndex: null,
    };
  }

  editSite = (index: number) => {
    this.setState({
      selectedSite: this.props.sites[index],
      selectedSiteIndex: index,
    });
  };

  getSitesList = () => {
    let removeButtonClassName = "remove-site";
    let editButtonIsActive = "";

    if (this.props.additionalOptions) {
      removeButtonClassName += " is-active";
      editButtonIsActive = "is-active";
    }

    let style = "";

    const sites = this.props.sites.map((site, index) => {
      style += `
      .site-button .image.site-image-${index} {
        background-image: url(${site.image});
      }
      `;

      return (
        <div key={index} className="site-button">
          <div className="name">{site.name}</div>
          <a className="link" href={site.url}>
            <div
              className={`image site-image-${index}`}
              //style={{ backgroundImage: `url(${site.image})` }}
            />
          </a>
          <div
            className={`edit-site ` + editButtonIsActive}
            onClick={e => {
              e.preventDefault();
              this.editSite(index);
            }}
          >
            ✎
          </div>
          <div
            className={removeButtonClassName}
            onClick={e => this.props.removeSite(index)}
          >
            ×
          </div>
        </div>
      );
    });

    return {
      sitesStyle: style,
      sites,
    };
  };

  componentDidMount = () => {
    const component = ReactDOM.findDOMNode(this);

    if (component instanceof HTMLElement) {
      const container = component.querySelector(".sites-grid");

      if (container instanceof HTMLElement) {
        let isActivated = false;

        const pos = {
          mx: container.offsetWidth / 2,
          my: container.offsetHeight / 2,
          x: container.offsetWidth / 2,
          y: container.offsetHeight / 2,
          rx: 0,
          ry: 0,
        };

        container.addEventListener("mousemove", e => {
          const rect = container.getBoundingClientRect();
          pos.mx = e.clientX - rect.left;
          pos.my = e.clientY - rect.top;
        });

        container.addEventListener("mouseleave", e => {
          pos.mx = container.offsetWidth / 2;
          pos.my = container.offsetHeight / 2;
        });

        container.addEventListener("mouseenter", e => {
          if (isActivated === false) {
            isActivated = true;
            pos.mx = container.offsetWidth / 2;
            pos.my = container.offsetHeight / 2;
            pos.x = pos.mx;
            pos.y = pos.my;
            animate();
          }
        });

        let lastTime = Date.now();
        const speed = 3.0;

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
    }
  };

  render() {
    if (this.props.showWebSites === false) {
      return null;
    }

    const { sitesStyle, sites } = this.getSitesList();

    return (
      <div className="sites-container">
        <style>{sitesStyle}</style>
        <EditSite site={this.state.selectedSite as ISite} />
        <div className="sites-grid">
          {sites}
          <AddSiteButton />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: SitesAppState): SitesStateProps => {
  return {
    sites: state.sitesApp.sites,
    additionalOptions: state.optionsApp.additionalOptions,
    showWebSites: state.optionsApp.showWebSites,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): SitesDispatchProps => {
  return {
    removeSite: (index: number) => {
      dispatch(removeSite(index));
    },

    updateSite: (index: number, site: Site) => {
      dispatch(updateSite(index, site));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sites);
*/
