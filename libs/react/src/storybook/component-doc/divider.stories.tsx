import React from 'react'
import { Divider, Col, Row } from '../..'
import './divider.stories.scss'

export default {
  title: 'Data Display/Divider',
  component: Divider
}

export const RowStoryBook = () => {
  return (
    <>
      <h4>分隔线-横向</h4>
      <Row>
        <Col span={8}>Low contrast</Col>
        <Col span={8}>Medium contrast</Col>
        <Col span={8}>High contrast</Col>
      </Row>
      <Row>
        <Col span={8} className="divider-demo">
          <Divider type="horizontal" contrast="low" />
        </Col>
        <Col span={8} className="divider-demo">
          <Divider type="horizontal" contrast="medium" />
        </Col>
        <Col span={8} className="divider-demo">
          <Divider type="horizontal" contrast="high" />
        </Col>
      </Row>
      <h4>分隔线-纵向</h4>
      <Row>
        <Col span={8}>Low contrast</Col>
        <Col span={8}>Medium contrast</Col>
        <Col span={8}>High contrast</Col>
      </Row>
      <Row>
        <Col span={8}>
          <Divider type="vertical" contrast="low" />
        </Col>
        <Col span={8}>
          <Divider type="vertical" contrast="medium" />
        </Col>
        <Col span={8}>
          <Divider type="vertical" contrast="high" />
        </Col>
      </Row>
    </>
  )
}
