import clsx from 'clsx';
import {PropsItemRuler} from './interfaces';
import styles from './ItemRuler.module.scss';
import {Trash} from 'iconsax-react';
import {memo} from 'react';
import {TYPE_RULER} from '~/constants/config/enum';

function ItemRuler({data, idx, showBtnDelete, handleDeleteRow, handleChangeValue}: PropsItemRuler) {
	return (
		<div className={clsx(styles.criteria)}>
			<div className={styles.input_field}>
				<input
					type='text'
					name='titleType'
					value={data?.titleType}
					placeholder='Nhập tiêu chí'
					className={styles.input}
					onChange={(e) => handleChangeValue(idx, 'titleType', e.target.value)}
				/>
			</div>
			<div className={styles.group_radio}>
				<div className={styles.item_radio}>
					<input
						value={data.rule}
						type='radio'
						id={`type_ruler_1_${idx}`}
						name={`type_ruler_1_${idx}`}
						checked={data?.rule == TYPE_RULER.NHO_HON}
						onChange={() => handleChangeValue(idx, 'rule', TYPE_RULER.NHO_HON)}
					/>
					<label htmlFor={`type_ruler_1_${idx}`}>&lt; Nhỏ hơn</label>
				</div>
				<div className={styles.item_radio}>
					<input
						value={data.rule}
						type='radio'
						id={`type_ruler_${idx}`}
						name={`type_ruler_${idx}`}
						checked={data?.rule == TYPE_RULER.LON_HON}
						onChange={() => handleChangeValue(idx, 'rule', TYPE_RULER.LON_HON)}
					/>
					<label htmlFor={`type_ruler_${idx}`}>&gt; Lớn hơn</label>
				</div>
			</div>

			<div className={styles.box_control}>
				<div className={styles.input_specification}>
					<input
						name='value'
						value={data.value}
						type='number'
						placeholder='Nhập thông số'
						className={styles.input}
						onChange={(e) => handleChangeValue(idx, 'value', e.target.value)}
					/>
					<div className={styles.unit}>%</div>
				</div>
				{showBtnDelete && (
					<div className={styles.btn_delete} onClick={() => handleDeleteRow(idx)}>
						<Trash />
					</div>
				)}
			</div>
		</div>
	);
}

export default memo(ItemRuler);
