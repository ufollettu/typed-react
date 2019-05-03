import React, { Component, FunctionComponent } from "react";

// interface used to share state with child component
interface ITabsContext {
  activeName?: string;
  handleTabClick?: (name: string, content: React.ReactNode) => void;
}
// by creating a context shared between the two components:
const TabsContext = React.createContext<ITabsContext>({});

interface IState {
  activeName: string;
  activeContent: React.ReactNode;
}

interface ITabProps {
  name: string;
  initialActive?: boolean;
  heading: () => string | JSX.Element;
}

class Tabs extends Component<{}, IState> {
  // child component Tab nested into Tabs
  // Tab lives only in Tabs, not in instanceof Tabs
  // it's called compound componet and can be used
  // by <Tabs.Tab> tag syntax inside <Tabs> tag
  public static Tab: FunctionComponent<ITabProps> = props => (
    // we can consume a context via the Consumer component
    // we have access to the state from the context argument
    // as well as access to the Tab component props object
    <TabsContext.Consumer>
      {(context: ITabsContext) => {
        // invoke the tab click handler if there is no active tab
        // in the context and the tab is flagged as initially active
        if (!context.activeName && props.initialActive) {
          if (context.handleTabClick) {
            context.handleTabClick(props.name, props.children);
            return null;
          }
        }
        const activeName = context.activeName
          ? context.activeName
          : props.initialActive
          ? props.name
          : "";
        const handleTabClick = (e: React.MouseEvent<HTMLLIElement>) => {
          if (context.handleTabClick) {
            context.handleTabClick(props.name, props.children);
          }
        };
        return (
          <li
            onClick={handleTabClick}
            className={props.name === activeName ? "active" : ""}
          >
            {/* 
                Tab doesn't have acces to member of Tabs, so we use
                props.children to pass props to Tab 
            */}
            {props.heading()}
          </li>
        );
      }}
    </TabsContext.Consumer>
  );

  public render() {
    return (
      // Provide context to Tab
      <TabsContext.Provider
        value={{
          activeName: this.state ? this.state.activeName : "",
          handleTabClick: this.handleTabClick
        }}
      >
        <ul className="tabs">
          {/* with props.children we render che children of node <Tabs.Tab> */}
          {this.props.children}
        </ul>
        <div>{this.state && this.state.activeContent}</div>
      </TabsContext.Provider>
    );
  }

  private handleTabClick = (name: string, content: React.ReactNode) => {
    this.setState({
      activeName: name,
      activeContent: content
    });
  };
}

export default Tabs;
