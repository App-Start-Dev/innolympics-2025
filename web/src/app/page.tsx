import ChildModal from '@/forms/child';
export default async function Home() {
    return (
        <div>
            <h1 className="text-4xl font-bold text-center mt-8">
                Welcome to Alix
            </h1>
            <ChildModal />
            <ChildModal
                initialData={{
                    name: 'John',
                    birthday: new Date(),
                    sex: 'male',
                    asdType: 'none',
                }}
                isUpdate
            />
        </div>
    );
}
