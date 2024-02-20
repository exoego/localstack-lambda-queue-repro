# localstack lambda repro

1. Run docker in a terminal with the following command:

```bash
docker-compose up
```

2. Open another terminal and run the following command:

```bash
npm ci

npm run test
npm run test 
```
Note that the second run is intended, to re-create the Lambda function during the test.


3. Go to the tab where the docker is running and you will see the following error in Docker logs:
    
```bash
localstack-1  | 2024-02-20T04:22:34.170 ERROR --- [functhread94] l.s.l.i.event_manager      : Error while polling lambda events for function arn:aws:lambda:us-east-1:000000000000:function:my-lambda:$LATEST: Queue not available
localstack-1  | 2024-02-20T04:22:35.171 ERROR --- [functhread94] l.s.l.i.event_manager      : Error while polling lambda events for function arn:aws:lambda:us-east-1:000000000000:function:my-lambda:$LATEST: Queue not available
localstack-1  | 2024-02-20T04:22:36.173 ERROR --- [functhread94] l.s.l.i.event_manager      : Error while polling lambda events for function arn:aws:lambda:us-east-1:000000000000:function:my-lambda:$LATEST: Queue not available
```
