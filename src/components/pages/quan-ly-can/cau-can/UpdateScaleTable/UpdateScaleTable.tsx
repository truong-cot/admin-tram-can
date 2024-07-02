import React, {Fragment, useEffect, useState} from 'react';
import {IFormUpdate, PropsUpdateScaleTable} from './interfaces';
import styles from './UpdateScaleTable.module.scss';
import Form, {FormContext, Input} from '~/components/common/Form';
import Button from '~/components/common/Button';
import {IoClose} from 'react-icons/io5';
import TextArea from '~/components/common/Form/components/TextArea';
import clsx from 'clsx';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_TYPE_FIND, QUERY_KEY} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import scalesStationServices from '~/services/scalesStationServices';
import scalesMachineServices from '~/services/scalesMachineServices';
import {toastWarn} from '~/common/funcs/toast';
import Select, {Option} from '~/components/common/Select';
import Loading from '~/components/common/Loading';

function UpdateScaleTable({dataUpdate, onClose}: PropsUpdateScaleTable) {
	const queryClient = useQueryClient();

	const [form, setForm] = useState<IFormUpdate>({name: '', scalesStationUuid: '', description: ''});

	useEffect(() => {
		setForm({
			name: dataUpdate?.name || '',
			scalesStationUuid: dataUpdate?.scalesStationUuid || '',
			description: dataUpdate?.description || '',
		});
	}, [dataUpdate]);

	const listScalesStation = useQuery([QUERY_KEY.dropdown_tram_can], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: scalesStationServices.listScalesStation({
					page: 1,
					pageSize: 20,
					keyword: '',
					companyUuid: '',
					isPaging: CONFIG_PAGING.NO_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.DROPDOWN,
					status: null,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const fucnUpdateScalesMachine = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Chỉnh sửa cầu cân thành công!',
				http: scalesMachineServices.upsertScalesMachine({
					uuid: dataUpdate?.uuid!,
					...form,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm({
					name: '',
					scalesStationUuid: '',
					description: '',
				});
				onClose();
				queryClient.invalidateQueries([QUERY_KEY.table_ban_can]);
			}
		},
		onError(error) {
			console.log({error});
			return;
		},
	});

	const handleSubmit = () => {
		if (!dataUpdate?.uuid) {
			return toastWarn({msg: 'Không tìm thấy cầu cân!'});
		}
		if (!form.scalesStationUuid) {
			return toastWarn({msg: 'Vui lòng chọn trạm cân!'});
		}

		return fucnUpdateScalesMachine.mutate();
	};

	return (
		<Fragment>
			<Loading loading={fucnUpdateScalesMachine.isLoading} />
			<div className={styles.container}>
				<h4>Chỉnh sửa cầu cân</h4>
				<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
					<Input
						name='name'
						value={form.name || ''}
						isRequired
						min={5}
						max={50}
						type='text'
						blur={true}
						placeholder='Nhập tên cầu cân'
						label={
							<span>
								Tên cầu cân <span style={{color: 'red'}}>*</span>
							</span>
						}
					/>

					<div className={clsx('mt')}>
						<Select
							isSearch
							name='scalesStationUuid'
							value={form.scalesStationUuid}
							placeholder='Chọn trạm cân'
							onChange={(e) =>
								setForm((prev: any) => ({
									...prev,
									scalesStationUuid: e.target.value,
								}))
							}
							label={
								<span>
									Trạm cân <span style={{color: 'red'}}>*</span>
								</span>
							}
						>
							{listScalesStation?.data?.map((v: any) => (
								<Option key={v?.uuid} value={v?.uuid} title={v?.name} />
							))}
						</Select>
					</div>

					<div className={clsx('mt')}>
						<TextArea placeholder='Thêm mô tả' name='description' label={<span>Mô tả</span>} blur />
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
										Cập nhật
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

export default UpdateScaleTable;
