import React from 'react';

import Style from './style.module.css';

class Splash extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: true
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isSplashOverlayOpen && !this.props.isSplashOverlayOpen) {
      // if the old splash was open and the new splash is not
      setTimeout(() => {
        this.setState({
          isOpen: false
        });
      }, 500);
    }
  }

  render() {
    return (
      <div
        className={`${Style.SplashOverlay} ${this.state.isOpen ? Style.Visible : Style.Hidden}`}
      />
    );
  }
}

export { Splash };
