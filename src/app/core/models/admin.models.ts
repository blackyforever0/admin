// Types miroir des DTOs Java (AdminDtos.java / AuthDtos.java) — /api/admin/**.

export type StatutCommande = 'EN_ATTENTE' | 'CONFIRMEE' | 'EN_LIVRAISON' | 'LIVREE' | 'ANNULEE';

export interface PointJournalier {
  jour: string;
  total: number;
}

export interface CommandeApercu {
  id: number;
  produitOuBoutique: string;
  clientNom: string;
  montantMmc: number;
  date: string;
}

export interface CourseApercu {
  id: number;
  chauffeurNom: string;
  trajet: string;
  prixMmc: number;
  date: string;
}

export interface VueEnsemble {
  totalUtilisateurs: number;
  commandesMoisCourant: number;
  coursesMoisCourant: number;
  volumeMmcMoisCourant: number;
  variationCommandesPourcent: number;
  variationCoursesPourcent: number;
  commandesParJour: PointJournalier[];
  coursesParJour: PointJournalier[];
  dernieresCommandes: CommandeApercu[];
  dernieresCourses: CourseApercu[];
}

export interface AdminUtilisateur {
  id: number;
  nomComplet: string;
  telephone: string;
  email: string | null;
  roles: string[];
  verifie: boolean;
  suspendu: boolean;
  soldeMmc: number;
  soldeGeleMmc: number;
  dateCreation: string;
}

export interface AdminBoutique {
  id: number;
  nom: string;
  proprietaireNom: string;
  proprietaireTelephone: string;
  nombreProduits: number;
  ventesTotalesMmc: number;
  certifiee: boolean;
  suspendue: boolean;
  dateCreation: string;
}

export interface AdminCommande {
  id: number;
  clientNom: string;
  boutiqueNom: string;
  montantMmc: number;
  statut: StatutCommande;
  signalee: boolean;
  date: string;
}

export interface EtapeLivraison {
  libelle: string;
  date: string;
  echec: boolean;
}

export interface SignalementResp {
  id: number;
  auteurNom: string;
  motif: string;
  description: string;
  statut: string;
  date: string;
}

export interface AdminCommandeDetail {
  id: number;
  produitNom: string;
  clientNom: string;
  boutiqueNom: string;
  livreurNom: string;
  montantMmc: number;
  statut: StatutCommande;
  signalee: boolean;
  pipeline: EtapeLivraison[];
  signalements: SignalementResp[];
}

export interface AdminProduit {
  id: number;
  nom: string;
  prixMmc: number;
  stock: number;
  actif: boolean;
}

export type StatutPublicite = 'EN_ATTENTE' | 'ACTIVE' | 'EXPIREE' | 'REFUSEE';

export interface Publicite {
  id: number;
  boutiqueId: number;
  boutiqueNom: string;
  titre: string;
  imageUrl: string | null;
  dureeJours: number;
  prixPayeMmc: number;
  statut: StatutPublicite;
  dateCreation: string;
  dateActivation: string | null;
  dateExpiration: string | null;
}

export interface AdminBoutiqueDetail {
  id: number;
  nom: string;
  proprietaireNom: string;
  proprietaireTelephone: string;
  certifiee: boolean;
  suspendue: boolean;
  dateCreation: string;
  nombreProduits: number;
  nombreCommandes: number;
  ventesTotalesMmc: number;
  produits: AdminProduit[];
  commandesRecentes: AdminCommande[];
  publicites: Publicite[];
}

export type ActionLitige = 'CONFIRMER' | 'REGENERER_CODE' | 'REMBOURSER';

export interface AdminChauffeur {
  id: number;
  nom: string;
  telephone: string;
  vehiculeType: string;
  vehiculeImmatriculation: string;
  noteMoyenne: number;
  nombreCourses: number;
  nombreLivraisons: number;
  disponible: boolean;
  suspendu: boolean;
}

export interface AdminChauffeurDetail {
  id: number;
  nom: string;
  telephone: string;
  vehiculeType: string;
  vehiculeImmatriculation: string;
  noteMoyenne: number;
  disponible: boolean;
  suspendu: boolean;
  inscritDepuis: string;
  nombreCourses: number;
  nombreLivraisons: number;
  revenusGeneresMmc: number;
  coursesRecentes: CourseApercu[];
  livraisonsRecentes: CommandeApercu[];
}

export interface MotoTaxis {
  nbScooter: number;
  nbTelimani: number;
  nbTricycle: number;
  chauffeursActifs: number;
  chauffeurs: AdminChauffeur[];
  coursesRecentes: CourseApercu[];
  livraisonsRecentes: CommandeApercu[];
}

export interface TopContributeur {
  nom: string;
  sousTitre: string;
  montantMmc: number;
}

export interface TransactionCommission {
  type: string;
  origine: string;
  montantTotalMmc: number;
  commissionMmc: number | null;
  bloqueeParLitige: boolean;
  date: string;
}

export interface Revenus {
  totalMoisMmc: number;
  commissionsMarketMmc: number;
  commissionsMotoTaxisMmc: number;
  soldePlateformeMmc: number;
  revenusParJour: PointJournalier[];
  partVentesPourcent: number;
  partLivraisonsPourcent: number;
  partCoursesPourcent: number;
  topBoutiques: TopContributeur[];
  topChauffeurs: TopContributeur[];
  transactionsRecentes: TransactionCommission[];
}

export interface AuthResponse {
  token: string;
  utilisateurId: number;
  roles: string[];
}
