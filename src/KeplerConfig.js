import ip from 'ip';

class KeplerConfig {

  projectName: String

  constructor(projectName: String) {
    this.projectName = projectName;
  }

  async getUrl(projectName: String) {
    const fileName = `/data/kepler.${this.projectName}.config.json`;
    const hostname = ip.address();
    return `http://${hostname}:4000${fileName}`;
  }

};

export default KeplerConfig;
