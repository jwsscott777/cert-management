import { OrganizationSwitcher } from "@clerk/nextjs";

export default function OrganizationSwitcherPage() {
    return (
 <div className="flex flex-col items-center justify-center min-h-screen bg-black">
  <h1 className="text-4xl font-bold mb-4 text-amber-800">Switch Organizations</h1>
  <h2 className="text-4xl font-bold mb-4 text-amber-800">Click 👇</h2>
  <OrganizationSwitcher
    className="border border-blue-300  rounded-md p-4 shadow-md"
    afterCreateOrganizationUrl="/dashboard"
    afterLeaveOrganizationUrl="/goodbye"
    afterOrganizationSelectedUrl="/dashboard"
    hidePersonal={true}
  />
</div>
    )
}