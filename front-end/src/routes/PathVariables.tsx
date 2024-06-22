export interface CLIENTROUTES {
    EDIT_JOB_POST: string,
    CREATE_JOB_POST: string,
    CLIENT_HOME: string,
    ADD_PROFILE_DESCRIPTION: string,
    ADD_CONTACT_DETAILS: string
    Profile: string,
    viewProposal: string,
    ContractSubmit: string
    ContactListing: string
    SendContract: string,
    ViewMiles: string,
    TransactionHistry: string
}
export const clientRoutes: CLIENTROUTES = {
    EDIT_JOB_POST: "/client/edit-job-post/:id",
    CREATE_JOB_POST: '/client/create-job-post/',
    CLIENT_HOME: "/client/home/",
    ADD_PROFILE_DESCRIPTION: "/client/profile-description/",
    ADD_CONTACT_DETAILS: "/client/add-contact/",
    Profile: "/client/profile/",
    viewProposal: "/client/view-proposal/",
    ContractSubmit: "/client/contract/send/",
    ContactListing: '/client/contract/all/',
    SendContract: "/client/send-contract/",
    ViewMiles: "/client/contract/work-details/:id",
    TransactionHistry: "/client/transaction/history/"
}


type ADMIN_ROUTES = {
    Login: string,
    UserMangment: string,
    JobCategoryManagment: string,
    Dashboard: string
    PlanMangment: string
}
export const admin_Routes: ADMIN_ROUTES = {
    Login: "/admin/login/",
    UserMangment: "/admin/user-management/",
    JobCategoryManagment: "/admin/job-Category-management/",
    Dashboard: "/admin/dashboard/",
    PlanMangment: '/admin/plan-mangment/'
}