import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Iniciar sesión
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Registrarse
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <main className="flex-grow flex items-center justify-center px-6 py-12">
                    <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 w-full">
                            <h1 className="text-4xl md:text-5xl font-bold text-violet-500 dark:text-violet-400 mb-6">
                                Bienvenido al Gestor de Tareas
                            </h1>
                            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                                Organiza, prioriza y colabora con tu equipo en tiempo real. Nuestra plataforma te permite
                                gestionar tus tareas diarias de forma eficiente y visual.
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Prueba desarrollada por Carlos Olarte
                            </p>
                        </div>
                        <div className="flex-1 w-full">
                            <img
                                src="/images/completed_task.svg"
                                alt="Gestor de Tareas"
                                className="w-full max-w-md h-auto mx-auto drop-shadow-xl"
                            />
                        </div>
                    </div>
                </main>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
