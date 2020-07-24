const dev = {
    apiGateway: {
        REGION: "us-east-1",
        URL: "https://sb8h7o0ecf.execute-api.us-east-1.amazonaws.com/dev"
    }
}

const prod = {
    apiGateway: {
        REGION: "us-east-1",
        URL: "https://sb8h7o0ecf.execute-api.us-east-1.amazonaws.com/dev"
    }
}

const config = process.env.REACT_APP_STAGE === 'prod'
    ? prod
    : dev

export default {
    ...config
}