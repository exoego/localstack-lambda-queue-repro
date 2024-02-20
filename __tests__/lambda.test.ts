import * as process from "process";
import {Lambda, waitUntilFunctionActiveV2} from "@aws-sdk/client-lambda"
import {beforeAll, it, expect} from "vitest";

const localstackLambda = new Lambda({
    region: "us-east-1",
    endpoint: "http://localhost:4566",
});

const FunctionName = "my-lambda";

beforeAll(async () => {
    try {
        await localstackLambda.deleteFunction({
            FunctionName,
        });
    } catch (e) {
        // ignore not found
    }

    await localstackLambda.createFunction({
        Code: {
            S3Bucket: "hot-reload",
            S3Key: `${process.cwd()}/src`,
        },
        FunctionName,
        Handler: "index.handler",
        Runtime: 'nodejs20.x',
        Role: 'arn:aws:iam::000000000000:role/dummy',
    });

    await waitUntilFunctionActiveV2(
        {
            client: localstackLambda,
            maxWaitTime: 1000,
        },
        {
            FunctionName
        },
    );
});

it("should successfully build a HandleEventCommand from a WebPersonalizationRequest", async () => {
    const invokeResult = await localstackLambda.invoke({
        FunctionName,
        Payload: JSON.stringify({}),
    });
    const response = JSON.parse(invokeResult.Payload?.transformToString('utf-8') ?? '{}');
    expect(response).toEqual({});
});
