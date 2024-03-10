import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SHIPS_ROUTE } from '../../utils/consts'
import styles from './HomePage.module.scss'
import { observer } from 'mobx-react-lite'
import Container from '../../components/Container/Container'
import Button from '../../components/Button/Button'

const HomePage = observer(() => {
	const navigate = useNavigate()

	return (
		<Container>
			<div className={styles.inner}>
				<div className={styles.header}>
					<h1 className={styles.title}>Морской бой</h1>
				</div>
				<div className={styles.button_box}>
					<Button
						className={'home_btn'}
						style={{ marginBottom: '12px' }}
						onClick={() => {
							navigate(SHIPS_ROUTE, { replace: true })
						}}
					>
						С другом
					</Button>
				</div>
			</div>
		</Container>
	)
})

export default HomePage
