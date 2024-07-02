import React, {useEffect, useRef, useState} from 'react';

import {PropsSelectSearch} from './interfaces';
import styles from './SelectSearch.module.scss';
import clsx from 'clsx';
import {removeVietnameseTones} from '~/common/funcs/optionConvert';

function SelectSearch({label, placeholder, options, data, setData}: PropsSelectSearch) {
	const ref = useRef<any>(null);

	const [open, setOpen] = useState<boolean>(false);
	const [keyword, setKeyword] = useState<string>('');

	const handleClickOutside = (event: any) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className={styles.container}>
			<label className={styles.label}>{label}</label>
			<div className={styles.box_input} ref={ref}>
				<input
					type='text'
					className={styles.input}
					placeholder={placeholder || 'Cá nhân, hợp tác xã'}
					name='keyword'
					value={data.name || keyword}
					autoComplete='off'
					onFocus={() => setOpen(true)}
					onChange={(e) => {
						setKeyword(e.target.value);
						setData({
							id: '',
							name: e.target.value,
						});
					}}
				/>

				<div
					className={clsx(styles.main_option, {
						[styles.open]:
							open &&
							options?.filter((v) => removeVietnameseTones(v.name)?.includes(keyword ? removeVietnameseTones(keyword) : ''))
								?.length > 0,
					})}
				>
					{options
						?.filter((v) => removeVietnameseTones(v.name)?.includes(keyword ? removeVietnameseTones(keyword) : ''))
						?.map((v) => (
							<div
								key={v.id}
								className={clsx(styles.item, {[styles.active]: v.id == data.id})}
								onClick={() => {
									setData(v);
									setOpen(false);
									setKeyword(v?.name);
								}}
							>
								{v.name}
							</div>
						))}
				</div>
			</div>
		</div>
	);
}

export default SelectSearch;
