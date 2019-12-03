import React from "react";
import { useDispatch } from "react-redux";
import { Accordion, Button, Table, Alert, FormControl, Card } from "react-bootstrap";
import { QUERIES } from "../../actions/queries";

const handleClick = (query, dispatch) => {
  dispatch({ type: QUERIES.RUN_QUERY, payload: query });
}

const getFileParam = (e) => {
  const formData = new FormData();
  formData.append('file', e.target.files[0], e.target.files[0].name);
  return formData;
}

const handleChange = (e, queryId, dispatch) => {
  dispatch({
    type: QUERIES.UPDATE_PARAM,
    payload: {
      queryId,
      name: e.target.name,
      value: e.target.name === 'file' ? getFileParam(e) : e.target.value
    }
  });
}

const Query = ({ query }) => {
  const { title, endpoint, params = [] } = query;
  const dispatch = useDispatch();

  return (
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey={query.queryId}>
        <strong>{title}</strong>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={query.queryId}>
        <Card.Body>
          <strong>URL Endpoint:</strong><br />
          <strong className="text-success">GET</strong> {endpoint}
          <br /><br />
          <strong>Parameters</strong>
          {!Object.keys(params).length
            ? (
              <Alert variant="info">
                No Parameters
              </Alert>
            )
            : (
              <Table bordered>
                <thead>
                  <tr>
                    <td>Parameter</td>
                    <td>Value</td>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(params).map((p, index) => (
                    <tr key={index}>
                      <td>{p}</td>
                      <td>
                        {p === 'file'
                          ? <FormControl
                            type="file"
                            onChange={(e) => handleChange(e, query.queryId, dispatch)}
                            name={p}
                          />
                          : <FormControl
                            onChange={(e) => handleChange(e, query.queryId, dispatch)}
                            value={params[p]}
                            name={p}
                          />
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )
          }
          <Button variant="primary" onClick={() => handleClick(query, dispatch)}>Try it!</Button>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
}

export default Query;