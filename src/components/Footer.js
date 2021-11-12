import { Container, Row, Col } from "react-bootstrap";
export const Footer = () => {
  return (
    <div className="footer pb-3 pt-5">
      <Container className="border-top pt-3">
        <Row>
          <Col xs={12} md={4}>
            <h6 className="text-warning">About Us</h6>
            <p className="mb-0">希羅亞旅行社股份有限公司</p>
            <p><a href="https://www.taiwanviptravel.com/">www.taiwanviptravel.com/</a></p>
            <h6 className="text-warning">Address</h6>
            <p>台灣台北市大安區復興南路一段137號14樓之3</p>
          </Col>
          <Col xs={12} md={4}>
            <h6 className="text-warning">Contact Us</h6>
            <p className="mb-0">電話：02-27217300</p>
            <p className="mb-0">傳真：02-27217179 </p>
            <p>信箱：service@siloahtravel.com</p>
          </Col>
          <Col xs={12} md={4}>
            {/* <Row>
                <Col className="text-center bg-primary">1</Col>
                <Col className="text-center bg-warning">2</Col>
                <Col className="text-center bg-primary">3</Col>
            </Row> */}
            <h6 className="text-warning">Information</h6>
            <p className="mb-0">服務時間：週一～週五 09:00-18:30</p>
            <p className="mb-0">代表人：戴東華</p>
            <p className="mb-0">聯絡人：李婕穎</p>
            <p className="mb-0">交觀甲793500　品保北2260 隱私權條款</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
