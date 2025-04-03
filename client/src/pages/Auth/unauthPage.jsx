import { FaLock } from 'react-icons/fa';

export const UnauthorizedMessage = () => {
    return (
        <div className="flex flex-col items-center mb-2">
            <div className="flex flex-col justify-center items-center p-10 text-center">
                <FaLock className="text-red-500 text-5xl mb-4" /> 
                <h1 className="font-semibold text-xl text-gray-600">
                    No tienes acceso a esta sección
                </h1>
            </div>
        </div>
    )
}
