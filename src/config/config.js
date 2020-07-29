const dev = {
    apiGateway: {
        REGION: "eu-central-1",
        URL: "https://ls3g40wm08.execute-api.eu-central-1.amazonaws.com/prod",
        WSS: "wss://iincephl5b.execute-api.eu-central-1.amazonaws.com/prod"
    }
}

const prod = {
    apiGateway: {
        REGION: "eu-central-1",
        URL: "https://jpr3alsp80.execute-api.eu-central-1.amazonaws.com/dev",
        WSS: "wss://aqmuh4xyl1.execute-api.eu-central-1.amazonaws.com/dev"
    }
}

const config = process.env.REACT_APP_STAGE === 'prod'
    ? prod
    : dev

export default {
    ...config
}