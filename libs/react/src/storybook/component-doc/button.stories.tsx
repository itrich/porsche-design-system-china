import React, { useState } from 'react';
import {
  IconChat,
  IconArrowHeadRight,
  IconArrowRight,
  IconEdit,
  IconAdd,
  IconBell
} from '@pui/icons';

import { Button, Col, Row } from '../../';
import './button.stories.scss';

export default {
  title: 'Action/Button',
  component: Button
};

export const ButtonStoryBook = () => {
  const buttonTypes = ['default', 'primary', 'secondary', 'text'];
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const renderButtonType = (type: any) => {
    return (
      <Row key={type}>
        <Col>
          <br />
          {type}
        </Col>
        <Col>
          <Button type={type}>按钮</Button>
        </Col>
        <Col>
          <Button type={type} className={'pui-button-type-' + type + '-hover'}>
            按钮
          </Button>
        </Col>
        <Col>
          <Button type={type} className={'pui-button-type-' + type + '-active'}>
            按钮
          </Button>
        </Col>
        <Col>
          <Button type={type} className={'pui-button-type-' + type + '-disabled'} disabled>
            按钮
          </Button>
        </Col>
        <Col>
          <Button type={type} loading>
            按钮
          </Button>
        </Col>
      </Row>
    );
  };

  return (
    <div>
      <div className="group">
        <div className="title">Types</div>
        <div className="show-case">
          <Button type="default" icon={<IconArrowHeadRight />}>
            Default Button
          </Button>
          <Button type="primary">Primary Button</Button>
          <Button type="secondary">Secondary Button</Button>
          <Button type="text">Text Button</Button>
          <Button type="primary" icon={<IconChat />} />
        </div>
      </div>

      <div className="group">
        <div className="title">Sizes</div>
        <div className="show-case">
          <Button size="default">Default Size Button</Button>
          <Button size="small">Small Size Button</Button>
        </div>
      </div>

      <div className="group">
        <div className="title">ICON BUTTON</div>
        <br />
        <div>
          <Button icon={<IconArrowRight />} />
          <Button type="primary" icon={<IconAdd />} />
          <Button type="secondary" icon={<IconEdit />} />
          <Button type="text" icon={<IconArrowRight />} />
        </div>
        <div>
          <Button icon={<IconArrowRight />}>进入</Button>
          <Button type="primary" icon={<IconAdd />}>
            添加
          </Button>
          <Button type="secondary" icon={<IconEdit />}>
            编辑
          </Button>
          <Button type="text" icon={<IconBell />}>
            提醒
          </Button>
        </div>
      </div>

      <div className="group">
        <div className="title">Loading Button</div>
        <Button
          loading={loading}
          type="primary"
          icon={<IconArrowHeadRight />}
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
            }, 2000);
          }}
        >
          提交
        </Button>
        <Button
          loading={loading2}
          type="secondary"
          icon={<IconArrowRight />}
          onClick={() => {
            setLoading2(true);
            setTimeout(() => {
              setLoading2(false);
            }, 2000);
          }}
        >
          提交
        </Button>
      </div>

      <div className="group">
        <div className="title">Styles</div>
        <Row className="headline">
          <Col>Type</Col>
          <Col>Default</Col>
          <Col>Hover</Col>
          <Col>Pressed</Col>
          <Col>Disabled</Col>
          <Col>Loading</Col>
        </Row>
        <br />
        {buttonTypes.map(type => {
          return renderButtonType(type);
        })}
      </div>
      <br />
    </div>
  );
};

ButtonStoryBook.storyName = 'Button';
