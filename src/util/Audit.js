import global from 'window-or-global';

class EmptyClass {}

export const Audit = (Parent = EmptyClass) => class extends Parent {

  enabled = process.env.NODE_ENV === 'development' && process.env.DISABLE_AUDIT !== true;
  console = global.console;
  mountText = `${this.constructor.name} mount time`;
  updateText = `${this.constructor.name} update time`;

  constructor(...params) {
    super(...params);
    if (this.enabled === true) {
      this.console.info(`${this.constructor.name} will mount with props :`, this.props);
      this.console.time(this.mountText);
    }
  }

  componentDidMount() {
    if (this.enabled === true) {
      this.console.info(`${this.constructor.name} did mount with props :`, this.props);
      this.console.timeEnd(this.mountText);
    }
  }

  componentWillUpdate() {
    if (this.enabled === true) {
      this.console.info(`${this.constructor.name} will update with props :`, this.props);
      this.console.time(this.updateText);
    }
  }

  componentDidUpdate() {
    if (this.enabled === true) {
      this.console.info(`${this.constructor.name} did update with props :`, this.props);
      this.console.timeEnd(this.updateText);
    }
  }

};

export default Audit;
