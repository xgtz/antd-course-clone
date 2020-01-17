import styles from './styles.less'
import {Button } from 'antd'

export default ()=>{
    return (
        <div>
            <p>
                <span className={styles['override-ant-btn']}>
                    <Button>圆角样式按钮</Button>
                </span>
            </p>
            <p>
                <Button>antd 原始按钮</Button>
            </p>
        </div>
    )
}