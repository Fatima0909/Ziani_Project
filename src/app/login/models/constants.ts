export class Constants {

    public static readonly LOC_OWNER_AUTH_GOOGLE = 'authGoogle';
    public static readonly LOC_CURRENT_VERSION = 'currentVersion';
    public static readonly LOC_OWNER_DATA = 'ownerData';
    public static readonly LOC_OWNER_AUTH_KEY = 'ownerId';
    public static readonly LOC_OWNER_ID_BY_ADMIN = 'ownerIdByAdmin';
    public static readonly LOC_SPACE_DATA = 'spaceData';
    public static readonly LOC_SPACE_HISTORY_DATA = 'spaceHistory';
    public static readonly LOC_MEDICAMENT_DATA = 'medicaments';
    public static readonly LOC_MEDICAMENT_VERSION = 'medicaments-version';
    public static readonly LOC_DISEASES_DATA = 'diseases';
    public static readonly LOC_DISEASES_VERSION = 'diseases-version';
    public static readonly LOC_MARKER_IMAGE = 'markerImage';
    public static readonly LOC_MARKER_IMAGE_SPACE = 'markerImageSpace';


  public static readonly NEW_ACCOUNT_MSG_MAP = new Map([
    [`auth/network-request-failed`, `Veuillez vérifier votre connexion`],
    ['auth/email-already-in-use', 'L\'adresse mail est déjà utilisée'],
    ['auth/invalid-email', 'L\'adresse mail saisie est invalide'],
    ['auth/operation-not-allowed', 'Votre compte est désactivé. Veuillez contacter notre service client au :  +216 53 30 62 31    ou par mail : info@esiha.tn'],
    ['auth/weak-password', 'Veuillez saisir un mot de passe sécurisé'],
    ['auth/user-not-found', 'Aucun compte n\'est trouvé pour cette adresse mail'],
    ['auth/wrong-password', 'Le mot de passe saisi est invalide'],
    ['auth/expired-action-code', 'Le lien est expiré'],
    ['auth/captcha-check-failed', 'Echec de validation'],
    ['auth/invalid-phone-number', 'Le numéro de téléphone n\'est pas valide'],
    ['auth/missing-phone-number', 'Veuillez saisir un numéro de téléphone valide'],
    ['auth/user-disabled', 'Votre compte est désactivé. Veuillez contacter notre service client'],
    ['auth/popup-closed-by-user', 'Vous n\'avez pas terminé votre identification'],
    ['auth/null-user', 'L\'utilisateur à mettre à jour est vide'],
    ['auth/user-token-expired', 'Session expirée'],
    ['auth/invalid-user-token', 'Session invalide (token)'],
    ['auth/invalid-verification-code', 'Le code de confirmation est invalide'],
    ['auth/internal-error', 'Probème interne. Veuillez vérifier votre connexion et / ou reconnectez-vous à nouveau'],
    ['auth/too-many-requests', 'Plusieurs requettes envoyés en même temps. Veuillez 0vérifier vos informations et d\'attendre quelques minutes avant réessayer']
  ]);
}
