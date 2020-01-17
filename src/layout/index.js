import { Component } from 'react'
import {Layout, Menu,Icon,LocaleProvider,ConfigProvider,Row,Col } from 'antd'
import Link from 'umi/link'
import indexStyle from './index.less';
import zh_CN from 'antd/es/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const {Header,Footer,Sider,Content} = Layout

const SubMenu = Menu.SubMenu

class BasicLayout extends Component{
    render(){
        return (
            <div style={{overflow:'hidden'}}>
                <Layout >
                    <div className={ indexStyle.Header }  >
                        <Row>
                            <Col span={12} className={indexStyle.HeaderTitle}> 
                                <span> <Icon type="compass" />蚂蚁金服</span>
                            </Col>
                            <Col span={7}></Col>
                            <Col span={2}>
                                <span><Icon type="user" />张三</span>
                            </Col>
                            <Col span={3}>
                                <span> <Icon type="clock-circle" /> 2020/01/13</span>
                            </Col>
                        </Row>
                    </div>
                    <Content style={{ margin:'2px 2px 0'}}>
                        <div style={{padding:2,background:'#fff', height:'100%'}}>
                            <ConfigProvider locale={zh_CN}>
                                { this.props.children}
                            </ConfigProvider>
                            
                        </div>
                    </Content>
                </Layout>

                {/* <Layout >
                    <Sider width={256} style={{ minHeight:'100vh', color:'white'}}>
                        <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px'}}/>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1">
                                <Icon type="pie-chart" />
                                <span>Helloworld</span>
                            </Menu.Item>
                            <SubMenu
                                key="sub1"
                                title={<span><Icon type="dashboard"></Icon><span>Dashboard</span></span>}
                            >
                                <Menu.Item key="2"><Link to="/dashboard/analysis">分析页</Link> </Menu.Item>
                                <Menu.Item key="3"><Link to="/dashboard/monitor">监控页</Link> </Menu.Item>
                                <Menu.Item key="4"><Link to="/dashboard/workplace">工作台</Link></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout >
                        <Header style={{ background:'#fff', textAlign:'center', padding:0, height:40, verticalAlign:'middle'}}>Header</Header>
                        <Content style={{ margin:'2px 2px 0'}}>
                            <div style={{padding:2,background:'#fff', height:'100%'}}>
                                <ConfigProvider locale={zh_CN}>
                                    { this.props.children}
                                </ConfigProvider>
                                
                            </div>
                        </Content>
                    </Layout>
                </Layout> */}
            </div>
        )
    }
}

export default BasicLayout