import { Form, Accordion } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setReceipt } from "../store/form";
export const Receipt = () => {
  const dispatch = useDispatch();
  const onChangeInput = (input, value) => {
    dispatch(setReceipt({ input: input, value: value }));
  };
  return (
    <div className="receipt">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>填寫代收轉付收據</Accordion.Header>
          <Accordion.Body>
            <Form>
              {/* <h4 className="text-center">填寫代收轉付收據</h4> */}
              <Form.Group className="mb-2">
                <Form.Control
                  type="text"
                  placeholder="抬頭"
                  onChange={(e) => onChangeInput("invBuyer", e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control type="text" placeholder="統一編號"  onChange={(e) => onChangeInput("invUid", e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control type="text" placeholder="代轉備註"  onChange={(e) => onChangeInput("invRemark", e.target.value)} />
              </Form.Group>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
