import ip from 'ip';

class KeplerConfig {

  projectName: String

  constructor(projectName: String) {
    this.projectName = projectName;
  }

  async getUrl(projectName: String) {
    const fileName = `/data/kepler.${this.projectName}.config.json`;
    const hostname = ip.address();
    if( process.env.PORT ) {
      return `https://${hostname}${fileName}`;
    } else {
      return `http://${hostname}:4000${fileName}`;
    }
  }

};

export default KeplerConfig;
