// CREATE CONFIG OBJECT

exports.settings = {
  verboseLogging: false,
  debugging: true,
  poolConfig: {
    min: 10,
    max: 500
  },
  instances: {
    DEV: {
      server: "WHG-SBOX01.WHG.LOCAL",
      userName: "dev_api_service",
      password: "letmein",
      options: {
          encrypt: "true",
          database: "DEV_SERVICES"
      }
    },
    TEST: {
      server: "mbcu-test-daaa-001.database.windows.net",
      userName: "demigod9946@mbcu-test-daaa-001.database.windows.net",
      password: "9b51S01$",
      options: {
          encrypt: "true",
          database: "MBCU-TEST-DAAA-002",
          requestTimeout: 40000
      }
    }
  }
};
