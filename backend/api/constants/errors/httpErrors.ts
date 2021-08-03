interface HttpErrors {
  [key: number]: {
    code?: number;
    message: string;
    details?: string;
  }
}

const HTTP_ERRORS: HttpErrors = {
  400: {
    message: "Bad Request",
    details: "La syntaxe de la requête est erronée."
  },
  401: {
    message: "Unauthorized",
    details: "Une authentification est nécessaire pour accéder à la ressource."
  },
  402: {
    message: "Payment Requirer",
    details: "Paiement requis pour accéder à la ressource."
  },
  403: {
    message: "Forbidden",
    details: "Le serveur a compris la requête, mais refuse de l'exécuter. Contrairement à l'erreur 401, s'authentifier ne fera aucune différence. Sur les serveurs où l'authentification est requise, cela signifie généralement que l'authentification a été acceptée mais que les droits d'accès ne permettent pas au client d'accéder à la ressource."
  },
  404: {
    message: "Not Found",
    details: "Ressource non trouvée."
  },
  405: {
    message: "Method Not Allowed",
    details: "Méthode de requête non autorisée."
  },
  406: {
    message: "Not Acceptable",
    details: "La ressource demandée n'est pas disponible dans un format qui respecterait les en-têtes « Accept » de la requête."
  },
  407: {
    message: "Proxy Authentication Required",
    details: "Accès à la ressource autorisé par identification avec le proxy."
  },
  408: {
    message: "Request Time-out",
    details: "Temps d’attente d’une requête du client, écoulé côté serveur. D'après les spécifications HTTP : « Le client n'a pas produit de requête dans le délai que le serveur était prêt à attendre. Le client PEUT répéter la demande sans modifications à tout moment ultérieur »9."
  },
  409: {
    message: "Conflict",
    details: "La requête ne peut être traitée en l’état actuel."
  },
  410: {
    message: "Gone",
    details: "La ressource n'est plus disponible et aucune adresse de redirection n’est connue."
  },
  411: {
    message: "Length Required",
    details: "La longueur de la requête n’a pas été précisée."
  },
  412: {
    message: "Precondition ",
    details: "Failed	Préconditions envoyées par la requête non vérifiées."
  },
  413: {
    message: "Request ",
    details: "Entity Too Large	Traitement abandonné dû à une requête trop importante."
  },
  414: {
    message: "Request-URI ",
    details: "Too Long	URI trop longue."
  },
  415: {
    message: "Unsupported Media Type",
    details: "Format de requête non supporté pour une méthode et une ressource données."
  },
  416: {
    message: "Requested range unsatisfiable",
    details: "Champs d’en-tête de requête « range » incorrect."
  },
  417: {
    message: "Expectation failed",
    details: "Comportement attendu et défini dans l’en-tête de la requête insatisfaisante."
  },
  418: {
    message: "I’m a teapot",
    details: "« Je suis une théière » : Ce code est défini dans la RFC 232410 datée du 1er avril 1998, Hyper Text Coffee Pot Control Protocol."
  },
  421: {
    message: "Bad mapping / Misdirected Request",
    details: "La requête a été envoyée à un serveur qui n'est pas capable de produire une réponse (par exemple, car une connexion a été réutilisée)."
  },
  422: {
    message: "Unprocessable entity",
    details: "WebDAV : L’entité fournie avec la requête est incompréhensible ou incomplète."
  },
  423: {
    message: "Locked",
    details: "WebDAV : L’opération ne peut avoir lieu car la ressource est verrouillée."
  },
  424: {
    message: "Method failure",
    details: "WebDAV : Une méthode de la transaction a échoué."
  },
  425: {
    message: "Too Early",
    details: "RFC 847011 : le serveur ne peut traiter la demande car elle risque d'être rejouée."
  },
  426: {
    message: "Upgrade Required",
    details: "RFC 281712 : Le client devrait changer de protocole, par exemple au profit de TLS/1.0."
  },
  428: {
    message: "Precondition Required",
    details: "RFC 658513 : La requête doit être conditionnelle."
  },
  429: {
    message: "Too Many Requests",
    details: "RFC 658514 : le client a émis trop de requêtes dans un délai donné."
  },
  431: {
    message: "Request Header Fields Too Large",
    details: "RFC 658514 : Les entêtes HTTP émises dépassent la taille maximale admise par le serveur."
  },
  449: {
    message: "Retry With",
    details: "Code défini par Microsoft. La requête devrait être renvoyée après avoir effectué une action."
  },
  450: {
    message: "Blocked by Windows Parental Controls",
    details: "Code défini par Microsoft. Cette erreur est produite lorsque les outils de contrôle parental de Windows sont activés et bloquent l’accès à la page."
  },
  451: {
    message: "Unavailable For Legal Reasons",
    details: "Ce code d'erreur indique que la ressource demandée est inaccessible pour des raisons d'ordre légal15,16."
  },
  456: {
    message: "Unrecoverable Error",
    details: "WebDAV : Erreur irrécupérable."
  },
  500: {
    message: "Internal Server Error",
    details: "Erreur interne du serveur."
  },
  501: {
    message: "Not Implemented",
    details: "Fonctionnalité réclamée non supportée par le serveur."
  },
  502: {
    message: "Bad Gateway ou Proxy Error",
    details: "En agissant en tant que serveur proxy ou passerelle, le serveur a reçu une réponse invalide depuis le serveur distant."
  },
  503: {
    message: "Service Unavailable",
    details: "Service temporairement indisponible ou en maintenance."
  },
  504: {
    message: "Gateway Time-out",
    details: "Temps d’attente d’une réponse d’un serveur à un serveur intermédiaire écoulé."
  },
  505: {
    message: "HTTP Version not supported",
    details: "Version HTTP non gérée par le serveur."
  },
  506: {
    message: "Variant Also Negotiates",
    details: "RFC 229518 : Erreur de négociation. Transparent content negociation."
  },
  507: {
    message: "Insufficient storage",
    details: "WebDAV : Espace insuffisant pour modifier les propriétés ou construire la collection."
  },
  508: {
    message: "Loop detected",
    details: "WebDAV : Boucle dans une mise en relation de ressources (RFC 584219)."
  },
  509: {
    message: "Bandwidth Limit Exceeded",
    details: "Utilisé par de nombreux serveurs pour indiquer un dépassement de quota."
  },
  510: {
    message: "Not extended",
    details: "RFC 277420 : La requête ne respecte pas la politique d'accès aux ressources HTTP étendues."
  },
  511: {
    message: "Network authentication required",
    details: "RFC 658514 : Le client doit s'authentifier pour accéder au réseau. Utilisé par les portails captifs pour rediriger les clients vers la page d'authentification."
  },
}

export default HTTP_ERRORS;