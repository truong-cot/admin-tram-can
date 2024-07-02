import React, {Fragment, useEffect, useState} from 'react';

import {PropsUpdateRFID} from './interfaces';
import styles from './UpdateRFID.module.scss';
import Loading from '~/components/common/Loading';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import rfidServices from '~/services/rfidServices';
import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_STATUS, CONFIG_TYPE_FIND, QUERY_KEY} from '~/constants/config/enum';
import Form, {FormContext, Input} from '~/components/common/Form';
import {IoClose} from 'react-icons/io5';
import Button from '~/components/common/Button';
import truckServices from '~/services/truckServices';
import TextArea from '~/components/common/Form/components/TextArea';
import Select, {Option} from '~/components/common/Select';
import clsx from 'clsx';

function UpdateRFID({dataUpdateRFID, onClose}: PropsUpdateRFID) {
	const queryClient = useQueryClient();

	const [form, setForm] = useState<{uuid: string; code: string; truckUuid: string; description: string}>({
		uuid: '',
		code: '',
		truckUuid: '',
		description: '',
	});

	useEffect(() => {
		if (dataUpdateRFID) {
			setForm({
				uuid: dataUpdateRFID.uuid || '',
				code: dataUpdateRFID.code || '',
				truckUuid: dataUpdateRFID?.truckUu?.uuid!,
				description: dataUpdateRFID?.description,
			});
		}
	}, [dataUpdateRFID]);

	const listTruck = useQuery([QUERY_KEY.dropdown_xe_hang], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: truckServices.listTruck({
					page: 1,
					pageSize: 20,
					keyword: '',
					isPaging: CONFIG_PAGING.NO_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.DROPDOWN,
					status: CONFIG_STATUS.HOAT_DONG,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const fucnUpdateRFID = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Chỉnh sửa RFID thành công!',
				http: rfidServices.upsertRFID({
					uuid: form.uuid,
					code: form.code,
					truckUuid: form.truckUuid,
					description: form.description,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm({
					uuid: '',
					code: '',
					truckUuid: '',
					description: '',
				});
				onClose();
				queryClient.invalidateQueries([QUERY_KEY.table_RFID]);
			}
		},
		onError(error) {
			console.log({error});
			return;
		},
	});

	const handleSubmit = () => {
		return fucnUpdateRFID.mutate();
	};

	return (
		<Fragment>
			<Loading loading={fucnUpdateRFID.isLoading} />
			<div className={styles.container}>
				<h4>Chỉnh sửa RFID</h4>
				<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
					<Input
						name='code'
						value={form.code || ''}
						isRequired
						min={5}
						max={50}
						type='text'
						blur={true}
						placeholder='Nhập code RFID'
						label={
							<span>
								Code RFID <span style={{color: 'red'}}>*</span>
							</span>
						}
					/>

					<div className={clsx('mt')}>
						<Select
							isSearch
							name='truckUuid'
							placeholder='Chọn xe'
							value={form?.truckUuid}
							onChange={(e: any) =>
								setForm((prev: any) => ({
									...prev,
									truckUuid: e.target.value,
								}))
							}
							label={<span>Xe hàng</span>}
						>
							{listTruck?.data?.map((v: any) => (
								<Option key={v?.uuid} value={v?.uuid} title={`${v?.licensePalate} - (${v?.code})`} />
							))}
						</Select>
					</div>

					<div className={clsx('mt')}>
						<TextArea name='description' placeholder='Nhập ghi chú' label={<span>Ghi chú</span>} />
					</div>

					<div className={styles.btn}>
						<div>
							<Button p_10_24 rounded_2 grey_outline onClick={onClose}>
								Hủy bỏ
							</Button>
						</div>
						<div>
							<FormContext.Consumer>
								{({isDone}) => (
									<Button disable={!isDone} p_10_24 rounded_2 primary>
										Lưu lại
									</Button>
								)}
							</FormContext.Consumer>
						</div>
					</div>

					<div className={styles.close} onClick={onClose}>
						<IoClose />
					</div>
				</Form>
			</div>
		</Fragment>
	);
}

export default UpdateRFID;
