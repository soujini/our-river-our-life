import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  waterMonitoringToolkit = [
    {
      name:'Water Laws',
      url:'https://our-river-our-life-images.s3.ap-south-1.amazonaws.com/resources/resources_water_laws.pdf',
      thumb:''
    },
    {
      name:'Guidelines for Monitoring',
      url:'https://our-river-our-life-images.s3.ap-south-1.amazonaws.com/resources/resources_guidelines_for_monitoring.pdf',
      thumb:''
    },
    {
      name:'Physical and Chemical Properties of Water',
      url:'https://our-river-our-life-images.s3.ap-south-1.amazonaws.com/resources/resources_physical_and_chemical_properties_of_water.pdf',
      thumb:''
    },
    {
      name:'Purchasing your own Field Testing Kit',
      url:'https://our-river-our-life-images.s3.ap-south-1.amazonaws.com/resources/resources_purchase_field_water_testing_kit.pdf',
      thumb:''
    },
    {
      name:'Awareness Poster',
      url:'https://our-river-our-life-images.s3.ap-south-1.amazonaws.com/resources/resources_awareness_poster.pdf',
      thumb:''
    },
  ];
  bioMonitoringToolkit = [
    {
      name:'Macro-Invertebrate Factsheet',
      url:'https://our-river-our-life-images.s3.ap-south-1.amazonaws.com/resources/resources_macro_invertebrate_factsheet.pdf',
      thumb:''
    },
    {
      name:'Macro-Invertebrate Key',
      url:'https://our-river-our-life-images.s3.ap-south-1.amazonaws.com/resources/resources_macro_invertebrate_key.pdf',
      thumb:''
    },
  ];
  importantLinks = [
    {
      name:'India Water Portal',
      url:'https://www.indiawaterportal.org/',
      thumb:'',
      description:'Is a website that shares knowledge and builds communities around water and related issues in India managed by Arghyam.'
    },
    {
      name:'South Asia Network of Dams, Rivers and People',
      url:'https://sandrp.in/',
      thumb:'',
      description:'Is an informal network working on issues related to rivers, communities and large scale water infrastructure like dams: their environmental and social impacts, their performance and issues related to governance of rivers and dams.'
    },
    {
      name:'The Forum for Policy Dialogue on Water Conflicts in India',
      url:'https://waterconflictforum.org/',
      thumb:'',
      description:'The Forum for Policy Dialogue on Water Conflicts in India is a network of individuals and organisations who are interested in engaging with water conflicts in India. The Forum has been in existence since 2003, and so far has completed two phases of its work. The first phase involved the understanding of water conflicts through documentation and the focus of the second phase was on resolving and preventing water conflicts. Currently the Forum is in its third phase and is working extensively to backstop conflicts.'
    },
    {
      name:'India Rivers Forum',
      url:'https://indiariversforum.org/',
      thumb:'',
      description:'India Rivers Forum has been created to establish a vibrant and active network of organizations and individuals who have dedicated themselves to work for the rejuvenation and restoration of rivers.'
    },
    {
      name:'Veditum',
      url:'http://www.veditum.org/',
      thumb:'',
      description:'Veditum projects lie on the intersection of environment, culture and society. We believe in the power of content and that each individual has the capacity to bring about change and lead a movement. Through content, in creation, delivery and consumption, we initiate a thinking process within individuals that leads to empathy laden thoughts and actions.'
    },
    {
      name:'Lively Waters, Zoo Outreach Organization',
      url:'https://www.livelywaters.zooreach.org/',
      thumb:'',
      description:"India's first non profit initiative focused on creating a nationwide awareness and action plan to safeguard freshwater ecosystems and biodiversity for our country’s future."
    },
    {
      name:'Wildlife Association of South India',
      url:'https://wasiindia.com/',
      thumb:'',
      description:"WASI has been engaged in the service of conservation from 1972. Conserving the Mahseer as an apex species has been their cherished goal and thereby extend protection to the entire riverine ecosystem, including the kaleidoscope of Wildlife that is dependent on the health of our rivers."
    },
    {
      name:'Rivers for Life, Life for Rivers',
      url:'https://www.wwfindia.org/about_wwf/reducing_footprint/rivers_for_life_life_for_rivers/',
      thumb:'',
      description:"WWF-India’s Rivers for Life, Life for Rivers programme envisions Ganga as a healthy river system that is rich in biodiversity, providing long-term water security to communities and nature. This initiative supported by the HSBC Water Programme (HWP), is a five-year partnership between HSBC, WWF, WaterAid and Earthwatch."
    },
    {
      name:'River Research Centre',
      url:'https://www.facebook.com/Cholayar/',
      thumb:'',
      description:"The River Research Centre (RRC) is a non-profit organization that creates a space for studies on rivers including environmental flows and seeks to promote participatory river conservation, restoration, and management. RRC tries to understand the resource extraction and environmental management policies that affect landscapes at the river basin scale. By analyzing the problems and possible consequences of resource use, RRC is able to propose corrective measures through research based campaigns and advocacy, and intervene at the policy level. RRC's goal is to ultimately help people make the right decisions to avoid further degradation and ensure the long term sustainability of river basins."
    },
    {
      name:'Integrated River Basin Management Society',
      url:'https://irbmskolkata.weebly.com/',
      thumb:'',
      description:"Integrated River Basin Management Society (IRBMS) is a Non Government Organization working in the field of conservation of natural resources through sustainable development. One of the objectives of the organization is to undertake, carry out, promote and sponsor rural and/or urban development including programmes for promoting social and economic welfare and the uplifting of the river basin people."
    },
    {
      name:'Neer Foundation',
      url:'http://www.theneerfoundation.org/river.aspx',
      thumb:'',
      description:"NEER strives to bring back rivers of Western Uttar Pradesh, back to their lives which were earlier the lifelines of the region. This is being achieved through awareness creation among the community living on the banks, implementing pollution control measures and advocating with the government bodies responsible for the safeguard. The organization has also taken the lead to prepare the first policy draft of river polity for Uttar Pradesh, for the government to formulate a policy based on the points."
    },
  ];
  educationAndOutreachLinks=[
    {
      name:'Moving from requiem to revival: India’s rivers and riverine ecosystems, in Transcending boundaries',
      url:"https://www.researchgate.net/publication/313377076_1_Jagdish_Krishnaswamy_Manish_Kumar_Nachiket_Kelkar_Tarun_Nair_Vidyadhar_Atkore_2017_Moving_from_requiem_to_revival_India's_rivers_and_riverine_ecosystems_in_Transcending_boundaries_Reflecting_on_twen",
      thumb:'',
      description:''
    },
    {
      name:'Wildlife Along Indian Rivers',
      url:"http://www.greenhumour.com/2017/09/wildlife-along-indian-rivers.html",
      thumb:'',
      description:"Indian rivers aren't ours alone to exploit and manipulate. Scores of endangered animals depend on them, and are at stake if ill-conceived projects like river-linking are undertaken. Find out which species are associated with Indian rivers in this series of illustrations."
    },
    {
      name:'Freshwater Turtles and Tortoises of India',
      url:"http://www.greenhumour.com/2020/05/freshwater-turtles-and-tortoises-of.html",
      thumb:'',
      description:"Meet the 29 species of freshwater turtles and tortoises of India! While sea turtles usually make all the headlines on World Turtle Day, let's shine the spotlight this time on our inland chelonians. Barring 3 species, each of these are at the risk of extinction. Turtles are among the most poached of all reptiles, and along with primates, are considered the most endangered vertebrates."
    },
    {
      name:'The Status and Distribution of Freshwater Biodiversity in the Western Ghats, India',
      url:"https://www.iucn.org/content/status-and-distribution-freshwater-biodiversity-western-ghats-india",
      thumb:'',
      description:"The Western Ghats is one of the world’s most heavily populated biodiversity hotspots providing for and supporting 400 million people. However, these diverse freshwater ecosystems face many threats because of untrammelled economic development. In most instances the development planning process does not consider the requirements of these freshwater ecosystems, mainly due to a lack of adequate information on the distribution and status of freshwater species and the threats they face. For this reason, the Western Ghats Freshwater Biodiversity Assessment was conducted to review the global conservation status and distributions of 1,146 freshwater species belonging to four taxonomic groups: fishes, molluscs, odonates and aquatic plants."
    },
    {
      name:'Riparian Profile of Dubare Reserved Forest',
      url:'https://our-river-our-life-images.s3.ap-south-1.amazonaws.com/resources/resources_riperian_profile_of_dubare_forest.pdf',
      thumb:'',
      description:""
    },
    {
      name:'Our River, Our Life (Awareness poster for fish)',
      url:"https://our-river-our-life-images.s3.ap-south-1.amazonaws.com/resources/resources_awareness_poster.pdf",
      thumb:'',
      description:""
    },

  ];
  governmentWebsites=[
    {
      name:'National River Conservation Directorate, Ministry of Jal Shakti',
      url:"https://nrcd.nic.in/",
      thumb:'',
      description:"The National River Conservation Directorate (NRCD) in the Ministry of Environment, Forests and Climate Change is implementing the Centrally Sponsored Schemes of National River Conservation Plan (NRCP) and National Plan for Conservation of Aquatic Ecosystems’(NPCA) for conservation of rivers, lakes and wetlands in the country. NRCD is only providing financial assistance under the National River Conservation Plan to the State Governments/ local bodies to set up infrastructure for pollution abatement of rivers in identified polluted river stretches based on proposals received from the State Governments/ local bodies."
    },
    {
      name:'Ministry of Jal Shakti, Department of Water Resources, River Development & Ganga Rejuvenation',
      url:"http://jalshakti-dowr.gov.in/",
      thumb:'',
      description:"The Ministry of Water Resources is responsible for laying down policy guidelines and programmes for the development and regulation of the country's water resources."
    },
    {
      name:'Central Water Commission',
      url:"http://www.cwc.gov.in/",
      thumb:'',
      description:"CWC is charged with the general responsibility of initiating, coordinating and furthering in consultation with the State Governments concerned, schemes for the control, conservation and utilization of water resources in the respective State for the purpose of flood management, irrigation, drinking water supply and water power generation. The Commission, if so required, can undertake the construction and execution of any such scheme."
    },
    {
      name:'National Mission for Clean Ganga',
      url:"https://nmcg.nic.in/",
      thumb:'',
      description:"Registered as a society on 12th August 2011 under the Societies Registration Act 1860. It acted as implementation arm of National Ganga River Basin Authority (NGRBA) which was constituted under the provisions of the Environment (Protection) Act (EPA), 1986. NGRBA has since been dissolved with effect from the 7th October 2016, consequent to constitution of National Council for Rejuvenation, Protection and Management of River Ganga (referred as National Ganga Council) vide notification no.  The Act envisages five tier structure at national, state and district level to take measures for prevention, control and abatement of environmental pollution in river Ganga and to ensure continuous adequate flow of water so as to rejuvenate the river Ganga."
    },
    {
      name:'Institute of Land and Disaster Management, Government of Kerala',
      url:"https://ildm.kerala.gov.in/en/river-management-cell-rmc/",
      thumb:'',
      description:""
    },
  ];

  constructor(private sanitizer: DomSanitizer) { }

  photoURL(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit(): void {
  }

}
