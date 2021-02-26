import React from 'react';
import { Row, Col } from 'reactstrap';

const Header = () => {
  return (
    <div id="page-header" className="mb-3">
      <Row>
        <Col md="6" sm="auto" className="text-center m-auto">
          <h1>Read My Blog</h1>
          <p>Robin의 사이드 프로젝트 블로그 입니다.</p>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
