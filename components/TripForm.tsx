'use client';

interface TripFormProps {
    origin?: string;
    destination?: string;
    departureTime?: string;
    type?: string;
    details?: string;
}

const TripForm = ({origin, destination, departureTime, type, details}: TripFormProps) => {

    return (
        <form>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
                <label htmlFor="first_name" className="block mb-2.5 text-sm font-medium text-heading">Origem</label>
                <input type="text" id="first_name" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" required autoComplete={ origin }/>
            </div>
            <div>
                <label htmlFor="last_name" className="block mb-2.5 text-sm font-medium text-heading">Destino</label>
                <input type="text" id="last_name" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" required autoComplete={ destination }/>
            </div>
            <div>
                <label htmlFor="phone" className="block mb-2.5 text-sm font-medium text-heading">Horário de saída</label>
                <input type="tel" id="phone" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" pattern="[0-9]{2}:[0-9]{2}" required autoComplete={ departureTime }/>
            </div>
            <div>
                <label htmlFor="website" className="block mb-2.5 text-sm font-medium text-heading">Tipo</label>
                <div className="flex items-center mb-4">
                    <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft" />
                    <label htmlFor="default-checkbox" className="select-none ms-2 text-sm font-medium text-heading">Empresa</label>
                </div>
                <div className="flex items-center">
                    <input checked id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft" />
                    <label htmlFor="checked-checkbox" className="select-none ms-2 text-sm font-medium text-heading">Prefeitura</label>
                </div>
            </div>
            <div>
                <label htmlFor="visitors" className="block mb-2.5 text-sm font-medium text-heading">Detalhes</label>
                <input type="number" id="visitors" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-6 shadow-xs placeholder:text-body" placeholder="" required autoComplete={ details }/>
            </div>
        </div>
        </form>
    );
}

export default TripForm;