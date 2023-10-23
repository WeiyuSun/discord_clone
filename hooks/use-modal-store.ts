import { create} from 'zustand';
import {ModalType} from '@/types';
import {Channel, ChannelType, Server} from '@prisma/client';

type ModalData = {
	server?: Server;
	channel?: Channel;
	channelType?: ChannelType;
}

type ModalStore = {
	type: ModalType | null;
	data: ModalData,
	isOpen: boolean,
	onOpen: (type: ModalType, data?: ModalData) => void,
	onClose: () => void
}

export const useModal = create<ModalStore>((set) => ({
	type: null,
	data: {},
	isOpen: false,
	onOpen: (type, data: ModalData | undefined = {}) => set({isOpen: true, type, data}),
	onClose: () => set({type: null, isOpen: false})
}));