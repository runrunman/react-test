import React, { Component } from 'react'
import {
  Card,
  Button,
  Icon,
  Table,
  Modal,
  message
} from 'antd'
import {connect} from 'react-redux'
import { reqCategorys ,reqUpdateCategory } from '../../api'
import LinkButton from '../../components/link-button'
import AddUpdateForm from './add-update-form'
@connect(
  state => ({categorys:state.categorys}),

)
 class Category extends Component {
  state = {
    categorys: [],
    loading:false,
  }
   columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
    },
    {
      width:300,
      title:'操作',
      render:() =><LinkButton>修改分类</LinkButton>
    }
  ]
  getCategorys = async() => {
    this.setState({
      loading:true
    })
    const msg = await this.props.getCategoryAsync()
    this.setState({
      loading: false
    })
    if (msg){
      message.error(msg)
    }
  }
  componentDidMount (){
    this.getCategorys()
  }
  render(){
    const {loading, isShowAdd} = this.state
    const {categorys} =this.props

    const estra =(
      <Button type="primary" onClick={()=>this.setState(
        {isShowAdd:true})}>
        <Icon type="plus"></Icon>
        添加
      </Button>
    )
  
  return (
    <Card >
      <Table 
        bordered
        loading={loading}
        dataSource={categorys} 
        // columns={columns} 
        rowKey="_id"
        pagination={{pageSize: 5, showQuickJumper: true}}
      />
      <Modal
        title="添加分类"
        visible={isShowAdd}
        onOk={this.addCategory}
        onCancel={this.hideAdd}
      >
        {/* <AddUpdateForm setForm = {() =>{}}/> */}
      </Modal>
      <Modal
        title="修改分类"
        visible={isShowAdd}
        onOk={this.addCategory}
        onCancel={this.hideAdd}
      >
        <AddUpdateForm setForm = {(form) =>this.form = form}
        categoryName={categorys.name}
        />
      </Modal>
    </Card>
  )
  }
}
export default Category