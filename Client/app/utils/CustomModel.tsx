import React, { FC, Component,ReactNode } from 'react';
import { Modal, Box } from '@mui/material';

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: any;
    component: any;
    setRoute?: (route: string) => void;
}

const CustomModel: FC<Props> = ({ open, setOpen, activeItem, setRoute, component: Component }) => {
    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                className='absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 800px:w-[450px] w-[90vw] bg-white dark:bg-slate-900 rounded-[8px] p-4 px-8 shadow outline-none'
            >
                <Component setOpen={setOpen} setRoute={setRoute} />
            </Box>
        </Modal>
    )
}

export default CustomModel;