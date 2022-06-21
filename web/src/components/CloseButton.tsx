import { Popover } from '@headlessui/react' // biblíoteca de controle de estado Widget (aberto/Fechado) {useState do react} ex: import { useState } from 'react';
import { X } from 'phosphor-react';

export function CloseButton() {
    return (
        <Popover.Button className="top-5 right-5 absolute text-zinc-400 hover:text-zinc-100" title="Fechar formulário de feedback">
        <X className="w-4 h4"/> 
     
        </Popover.Button>
    );
}