const dev = {
    apiGateway: {
        REGION: "us-east-1",
        URL: "https://ls3g40wm08.execute-api.eu-central-1.amazonaws.com/prod"
    }
}

const prod = {
    apiGateway: {
        REGION: "us-east-1",
        URL: "https://ls3g40wm08.execute-api.eu-central-1.amazonaws.com/prod"
    }
}

const config = process.env.REACT_APP_STAGE === 'prod'
    ? prod
    : dev

export default {
    ...config
}