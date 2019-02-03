import ip from 'ip';

class KeplerConfig {

  constructor() {

  }

  async getUrl() {
    const fileName = '/data/kepler.map.config.json';
    const hostname = ip.address();
    return `http://${hostname}:4000${fileName}`;
  }

};

export default KeplerConfig;
