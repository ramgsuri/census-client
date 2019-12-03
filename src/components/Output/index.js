import React from "react";
import { useSelector } from "react-redux";
import { Alert, Row, Col, Card, Table, Container } from "react-bootstrap";

const Output = () => {
  const output = useSelector(state => state.output);
  const query = useSelector(state => state.queries.find(q => q.queryId === output.queryId));

  return (
    <div className="output pt-4 pb-4">
      <strong>Output</strong><br />
      <Card className="response" bg="dark" text="white">
        <Card.Body>
          {!output.response
            ? <strong>Try out any API endpoints to see the output here.</strong>
            : (

              <Container fluid={true} className="">
                <Row>
                  <Col xs="auto" className={`method ${!query ? '' : query.method.toLowerCase()}`}>{query && query.method}</Col>
                  <Col className="endpoint">
                    {query && query.endpoint}{query.params ? `?${(new URLSearchParams(query.params)).toString()}` : ''}</Col>
                </Row>
                <br />
                <Row>
                  <strong>Formatted Result:</strong> <br />
                  {output
                    && output.response
                    && output.response.result
                    && (
                      <Table striped bordered variant="dark" size="sm">
                        <thead><tr><th className="text-success">Zipcodes</th></tr></thead>
                        <tbody>
                          {output.response.result.map((r, i) => <tr key={i}><td>{r}</td></tr>)}
                        </tbody>
                      </Table>
                    )
                  }
                  {
                    output
                    && output.response
                    && !output.response.result
                    && output.response.status
                    && <Alert variant="info" style={{ width: "100%" }}>
                      {output.status}
                    </Alert>
                  }
                </Row>
                <br />
                <Row>
                  <strong>Raw Response:</strong><br />
                  <Alert variant="dark" style={{ width: "100%" }}>
                    <pre className="pre">{output && JSON.stringify(output.response, null, 2)}</pre>
                  </Alert>
                </Row>
              </Container>
            )
          }
        </Card.Body>
      </Card>
    </div>
  )
};

export default Output;