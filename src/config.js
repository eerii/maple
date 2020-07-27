const dev = {
    apiGateway: {
        REGION: "us-east-1",
        URL: "https://qxa5ukdvlh.execute-api.eu-central-1.amazonaws.com/dev"
    }
}

const prod = {
    apiGateway: {
        REGION: "us-east-1",
        URL: "https://qxa5ukdvlh.execute-api.eu-central-1.amazonaws.com/dev"
    }
}

const config = process.env.REACT_APP_STAGE === 'prod'
    ? prod
    : dev

export default {
    ...config
}